const { expect } = require('chai');
const knn = require('../index');
const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, "..", 'assets', 'test');

const getAssetsImage = (image) => {
	try {
		return fs.readFileSync(path.join(assetsPath, image));
	} catch (error) {
		console.log({ error })
		throw new Error('Image not found');
	}
}

describe('knn', () => {

	const class1Tag = 'apple';
	const class2Tag = 'peach';
	const testImages = {
		class1: [
			'apple6.jpg',
			'apple7.jpg'
		],
		class2: [
			'peach6.jpg',
			'peach7.jpg'
		]
	}
	const imageClassification = new knn();
	before(async function () {
		this.timeout(60000);
		const trainImagesClass1 = ['apple1.jpg', 'apple2.jpg', 'apple3.jpg', 'apple4.jpg', 'apple5.jpg']
		const trainImagesClass2 = ['peach1.jpg', 'peach2.jpg', 'peach3.jpg', 'peach4.jpg', 'peach5.jpg']

		await imageClassification.init();

		trainImagesClass1.forEach((img) => {
			console.log(`training ${img}`)
			imageClassification.train(getAssetsImage(img), class1Tag);
		});
		trainImagesClass2.forEach((img) => {
			console.log(`training ${img}`)
			imageClassification.train(getAssetsImage(img), class2Tag);
		});
	})


	testImages.class1.forEach(function (img) {
		it(`should classify ${img} as ${class1Tag}`, async function () {
			this.timeout(10000);
			console.log("predicting...")
			const result = await imageClassification.predict(getAssetsImage(img));
			console.log({ result })
			expect(result.label).to.equal(class1Tag);
		})
	});

	testImages.class2.forEach(function (img) {
		it(`should classify ${img} as ${class2Tag}`, async function () {
			this.timeout(10000);
			console.log("predicting...")
			const result = await imageClassification.predict(getAssetsImage(img));
			console.log({ result })
			expect(result.label).to.equal(class2Tag);
		})
	});

})
