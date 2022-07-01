import React from 'react'

function ResizeImg({img, width, height}) {
	console.log(img)
	
	async function reduce_image_file_size(
		base64Str,
		MAX_WIDTH = width,
		MAX_HEIGHT = height
	) {
		let resized_base64 = await new Promise((resolve) => {
			let img = new Image();
			img.src = base64Str;
			img.onload = () => {
				let canvas = document.createElement('canvas');
				let width = img.width;
				let height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				let ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);
				img.crossOrigin = "Anonymous";
				resolve(canvas.toDataURL());
			};
		});
		return resized_base64;
	}

	// async function process_image(img, min_image_size = 500) {
	// 	const res = img;
	// 	console.log(res)
	// 	if (res) {
	// 		const old_size = calc_image_size(res);
	// 		if (old_size < min_image_size) {
	// 			const resized = await reduce_image_file_size(res);
	// 			const new_size = calc_image_size(resized);
	// 			console.log('new_size=> ', new_size, 'KB');
	// 			console.log('old_size=> ', old_size, 'KB');
	// 			return resized;
	// 		} else {
	// 			console.log('image already small enough');
	// 			return res;
	// 		}
	// 	} else {
	// 		console.log('return err');
	// 		return null;
	// 	}
	// }

	async function preview_image(img) {
		console.log(img)
		const res = await reduce_image_file_size(img)
		console.log(res)
		if (res) {
			document.getElementById("old").src = res;

			const olds = calc_image_size(res)
			console.log('Old size => ', olds, 'KB')

			const resized = await reduce_image_file_size(res);
			const news = calc_image_size(resized)
			console.log('new size => ', news, 'KB')
			document.getElementById("new").src = resized;
		} else {
			console.log('return err')
		}
	}

	function calc_image_size(image) {
		let y = 1;
		if (image.endsWith('==')) {
			y = 2;
		}
		const x_size = image.length * (3 / 4) - y;
		return Math.round(x_size / 1024);
	}

  return (
	<div>
		<img id="old" src={reduce_image_file_size(img)} alt="old" />
		<img id="new" src={preview_image(img)} alt="new" />
	</div>
  )
}

export default ResizeImg