export default easeIn;
// velocity over time
// as time increases velocity increases 
// both start at 0
// increase along duration and to
// durationMS divided by FPS
// 250 MS / 60 FPS = 15 frames (ie easeIn will run 15 times)

// 60 FPS
// 1000 MS in 1 SECOND
// (1/60fps) * 1000 = 16.67 MS
const FPMS: number = (1 / 60) * 1000;

function easeIn(from: number, to: number, durationInMS: number) {
  if(from >= to) { return; }

  let _frames: number = durationInMS / FPMS;
  let _increment: number = _frames / durationInMS;

  return from += _increment;
}
