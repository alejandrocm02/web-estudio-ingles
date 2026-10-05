"""Render the existing curriculum once; no TTS runtime is shipped to browsers.
Export tracks.json from data.js + curriculum-update.js before running.
Dependencies: kokoro-onnx==0.4.9, soundfile==0.13.1, lameenc==1.8.1.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import sys

p = argparse.ArgumentParser()
p.add_argument('--build-dir', type=Path, required=True)
p.add_argument('--output', type=Path, default=Path('audio'))
args = p.parse_args()
sys.path.insert(0, str(args.build_dir / 'python'))
import numpy as np
import onnxruntime as ort
import lameenc
from kokoro_onnx import Kokoro

options = ort.SessionOptions()
options.intra_op_num_threads = 4
options.inter_op_num_threads = 1
session = ort.InferenceSession(str(args.build_dir / 'kokoro-v1.0.onnx'), sess_options=options, providers=['CPUExecutionProvider'])
# kokoro-onnx 0.4.9 passes int32 speed for the newer input_ids export,
# while the v1.1 release model declares float32. Match the actual graph.
run_session = session.run
def run_typed(outputs, inputs):
    if next(i.type for i in session.get_inputs() if i.name == 'speed') == 'tensor(float)':
        inputs['speed'] = np.asarray(inputs['speed'], dtype=np.float32)
    return run_session(outputs, inputs)
session.run = run_typed
engine = Kokoro.from_session(session, str(args.build_dir / 'voices-v1.0.bin'))
tracks = json.loads((args.build_dir / 'tracks.json').read_text(encoding='utf-8'))
args.output.mkdir(parents=True, exist_ok=True)
manifest = {}
for track in tracks:
    key = f"{track['level']}-{track['index']}"
    voice, language = ('af_heart', 'en-us') if track['accent'] == 'US' else ('bf_emma', 'en-gb')
    chunks = re.split(r'(?<=[.!?])\s+', track['script'])
    rendered = []
    for chunk in chunks:
        if not chunk.strip():
            continue
        assert len(chunk) < 500, f'Needs shorter sentence: {key}'
        samples, rate = engine.create(chunk, voice=voice, speed=1.0, lang=language)
        assert np.isfinite(samples).all() and len(samples) > 1000
        rendered.extend([samples, np.zeros(round(rate * .22), dtype=np.float32)])
    audio = np.concatenate(rendered)
    peak = float(np.max(np.abs(audio)))
    assert peak > .01
    audio = audio * (0.89 / peak)
    pcm = (audio * 32767).astype('<i2')
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(96)
    encoder.set_in_sample_rate(rate)
    encoder.set_channels(1)
    encoder.set_quality(2)
    encoded = encoder.encode(pcm.tobytes()) + encoder.flush()
    filename = f'{key}-v1.mp3'
    (args.output / filename).write_bytes(encoded)
    manifest[key] = dict(src=f'audio/{filename}', duration=round(len(audio)/rate, 3), voice=voice, lang=language, sampleRate=rate, scriptSha256=hashlib.sha256(track['script'].encode()).hexdigest(), sha256=hashlib.sha256(encoded).hexdigest(), bytes=len(encoded))
    print(f'{key}: {len(audio)/rate:.1f}s, {len(encoded)} bytes', flush=True)
    (args.output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
Path('audio-assets.js').write_text('window.StudyAudioAssets = ' + json.dumps(manifest, indent=2) + ';\n', encoding='utf-8')
