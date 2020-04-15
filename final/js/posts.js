function createElement(_class, text) {
	const element = document.createElement('div');
	element.classList.add(_class);
	element.textContent = text;
	return element;
}

function createPost(postData, _userData, postId) {

	const userData = _userData || {
		displayName: "Anonymous"
	};

	const post = createElement('post'); // container element
	const text = createElement('text', postData.text);
	const author = createElement('author', 'by ');
	const authorLink = document.createElement('a');
	authorLink.href = 'user.html?uid=' + postData.uid;

	authorLink.textContent = userData.displayName;
	author.appendChild(authorLink);

	var d = new Date(postData.date);
	const date = createElement('date', (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear());

	//	posts.appendChild(post);
	posts.insertBefore(post, posts.firstElementChild);

	/* adding user profile image */
	const img = new Image();
	if (userData.imageURL) {
		img.src = userData.imageURL;
	} else {
		img.src = 'images/logo.png';
	}
	img.classList.add('profile-image');


	if (postData.imageURL) {
		const attachImg = new Image();
		attachImg.src = postData.imageURL;
		post.appendChild(attachImg);
		attachImg.classList.add('attach-image');
	}

	/* link to the post - permanent link */
	const postLink = document.createElement('a');
	postLink.href = 'post.html?id=' + postId;
	postLink.textContent = "Permalink";

	if (postData.tags) {
		var textHTML = postData.text;
		for (const tag in postData.tags) {
			const re = new RegExp('#' + tag, 'g');
			textHTML = textHTML.replace(re, '<a href="tags.html?tag=' + tag + '">#' + tag + '</a>');
		}
		text.innerHTML = textHTML;
	}

	post.appendChild(img);
	post.appendChild(text);
	post.appendChild(author);
	post.appendChild(date);
	post.appendChild(postLink);

}
