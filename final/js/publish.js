const postText = document.getElementById('post-text');
const publishButton = document.getElementById('publish');

publishButton.addEventListener('click', publishPost);
postText.addEventListener('keyup', function (event) {
	if (event.which == 13) {
		publishPost();
	}
});

const ref = firebase.database().ref('posts');

function publishPost() {
	const post = {}; // empty object
	post.text = postText.value;
	post.uid = firebase.auth().currentUser.uid;
	post.date = Date.now();

	const tags = postText.value.match(/#[a-z0-9]+/gi);
	if (tags) {
		post.tags = {};
		for (let i = 0; i < tags.length; i++) {
			const tag = tags[i].replace('#', '');
			post.tags[tag] = true;
		}
	}

	// push post to database
	const promise = ref.push(post);
	promise.then(function (snapshot) {
		addImage(snapshot.key);
	})

	postText.value = ""; // reset the textarea
}


function addImage(postId) {
	// upload the file
	const storage = firebase.storage();
	const user = firebase.auth().currentUser;
	const storageRef = storage.ref('posts').child(postId).child('add-image');

	const promise = storageRef.put(file);

	promise.then(function (image) {
		return image.ref.getDownloadURL();
	}).then(function (url) {
		ref.child(postId).update({
			imageURL: url
		});
	});
}

let file;

const imageButton = document.getElementById('submit-image');
imageButton.addEventListener('click', function () {
	// get the file
	file = document.getElementById('image-file').files[0];

});
