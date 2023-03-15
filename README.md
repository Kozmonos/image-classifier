# Image Classification

![Tensorflow](./assets/readme/tensorflow.png)

This package allows you to interact with 3 simple functions (init, train, predict) using Tensorflow JS's @tensorflow-models/knn-classifier package.

```javascript
const fs = require("fs");
const imageClassifier = require("@kozmonos/image-classifier");

// Initialize the classifier
const classifier = await imageClassifier.init();

// Train the classifier
const image = fs.readFileSync("./image.png");
const label = "label";
classifier.addExample(image, label);

const image2 = fs.readFileSync("./image2.png");
const label2 = "label2";
classifier.addExample(image2, label2);

// Predict the class of an image
const result = await classifier.predictClass(image);
/*
 out: {  classIndex: 0, label: 'label2',  confidences: { label2: 0.6666666666666666, label: 0.3333333333333333 } }
*/
```
