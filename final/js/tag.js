/* database query */
const tag = location.search.split('=')[1];
document.getElementById('tag').textContent = tag;
const posts = document.getElementById('posts');

const postRef = firebase.database().ref('posts').orderByChild('tags/' + tag).equalTo(true);

postRef.on('child_added', function (snapshot) {
	const postData = snapshot.val();
	const postId = snapshot.key;

	const userRef = firebase.database().ref('users').child(postData.uid);
	userRef.on('value', function (snapshot) {
		const userInfo = snapshot.val();
		createPost(postData, userInfo, postId);
	});
});