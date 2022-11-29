import { Component, OnInit } from '@angular/core';
import * as fp from '../../assets/fingerpose'
import { Router } from '@angular/router';

declare let handpose: any;

@Component({
  selector: 'app-sign-to-text',
  templateUrl: './sign-to-text.component.html',
  styleUrls: ['./sign-to-text.component.scss']
})
export class SignToTextComponent implements OnInit {

  title = 'iris';
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.initCamera(
      this.config.video.width, this.config.video.height, this.config.video.fps
    ).then((video: any) => {
      video.play();
      video.addEventListener("loadeddata", event => {
        console.log("Camera is ready");
        this.main();
      });
    });

    const canvas = document.querySelector("#pose-canvas");
    (canvas as any)!.width = this.config.video.width;
    (canvas as any)!.height = this.config.video.height;
    console.log("Canvas initialized");
  }

  changeVideo() {
    document.getElementById('video')?.classList.toggle('hide-element');
    document.getElementById('speechToTextResult')?.classList.toggle('show-element');
    document.getElementById('microphone')?.classList.toggle('show-element');
  }

  getSpeech = () => {
    document.getElementById('mic-icon')?.classList.add('ping');
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    let recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("starting listening, speak in microphone");
    }
    recognition.onspeechend = () => {
      document.getElementById('mic-icon')?.classList.remove('ping');
      console.log("stopped listening");
      recognition.stop();
    }
    recognition.onresult = (result) => {
      // document.getElementById('speechToTextResult').innerHTML = result.results[0][0].transcript;
      console.log(result.results[0][0].transcript);
    }

    recognition.start();
  }

  setLang() {
    document.getElementById('lang')!.innerHTML = 'dzo';
  }


  config = {
    video: {
      width: 640,
      height: 480,
      fps: 30
    }
  };

  changeLang(data) {
    document.getElementById('lang')!.innerHTML = data;

    ['en', 'dzo', 'nepali', 'sharchop'].forEach(res => {
      if (res != data) {
        document.getElementById(res)!.style.color = 'gray';
      } else {
        document.getElementById(res)!.style.color = '#728AB7';
      }
    })
  }

  landmarkColors = {
    thumb: 'white',
    indexFinger: 'white',
    middleFinger: 'white',
    ringFinger: 'white',
    pinky: 'white',
    palmBase: 'white'
  };

  gestureStrings = {
    'thumbs_up': '',
    'victory': ''
  };

  async main() {
    const video = document.querySelector("#pose-video");
    const canvas = document.querySelector("#pose-canvas");
    const ctx = (canvas as any)?.getContext("2d");

    const resultLayer = document.querySelector("#pose-result");

    // configure gesture estimator
    // add "✌🏻" and "👍" as sample gestures
    const knownGestures = [
      fp.Gestures.VictoryGesture,
      fp.Gestures.ThumbsUpGesture
    ];

    const GE = new fp.GestureEstimator(knownGestures);

    // load handpose model
    const model = await handpose.load();
    console.log("Handpose model loaded");

    // main estimation loop
    const estimateHands = async () => {

      // clear canvas overlay
      ctx.clearRect(0, 0, this.config.video.width, this.config.video.height);
      (resultLayer as any)!.innerText = '';

      // get hand landmarks from video
      // Note: Handpose currently only detects one hand at a time
      // Therefore the maximum number of predictions is 1
      const predictions = await model.estimateHands(video, true);

      for (let i = 0; i < predictions.length; i++) {

        // draw colored dots at each predicted joint position
        for (let part in predictions[i].annotations) {
          for (let point of predictions[i].annotations[part]) {
            this.drawPoint(ctx, point[0], point[1], 3, this.landmarkColors[part]);
          }
        }

        // estimate gestures based on landmarks
        // using a minimum score of 9 (out of 10)
        // gesture candidates with lower score will not be returned
        const est = GE.estimate(predictions[i].landmarks, 9);

        if (est.gestures.length > 0) {

          // find gesture with highest match score
          let result = est.gestures.reduce((p, c) => {
            return (p.score > c.score) ? p : c;
          });

          (resultLayer as any)!.innerText = this.gestureStrings[result.name];
        }

        // update debug info
        this.updateDebugInfo(est.poseData);
      }

      // ...and so on
      setTimeout(() => {
        estimateHands();
      }, 1000 / this.config.video.fps);
    };

    estimateHands();
    console.log("Starting predictions");
  }

  async initCamera(width, height, fps) {

    const constraints = {
      audio: false,
      video: {
        facingMode: "user",
        width: width,
        height: height,
        frameRate: {
          max: fps
        }
      }
    };

    const video = document.querySelector("#pose-video");
    (video as any)!.width = width;
    (video as any)!.height = height;

    // get video stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    (video as any).srcObject = stream;

    return new Promise(resolve => {
      (video as any).onloadedmetadata = () => {
        resolve(video)
      };
    });
  }

  drawPoint(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  updateDebugInfo(data) {
    for (let fingerIdx in data) {
      document.getElementById("curl-" + fingerIdx)!.innerText = data[fingerIdx][1];
      document.getElementById("dir-" + fingerIdx)!.innerText = data[fingerIdx][2];
    }
  }

  changeToText() {
    this.router.navigateByUrl('app?show=false');
  }
}

