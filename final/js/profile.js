const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);
const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');
const phoneInput = document.getElementById('phone');
const genderInput = document.getElementById('gender');
const websiteInput = document.getElementById('website');



// Profile Info
userRef.on('value', function (snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;

	if (userInfo.bio) {
		bioInput.value = userInfo.bio;

		(userInfo.phone)
		phoneInput.value = userInfo.phone;

		(userInfo.gender)
		genderInput.value = userInfo.gender;

		(userInfo.website)
		websiteInput.value = userInfo.website;
	}
});

updateButton.onclick = function () {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value,
		phone: phoneInput.value,
		gender: genderInput.value,
		website: websiteInput.value
	});
};


const imageButton = document.getElementById('submit-image');
imageButton.addEventListener('click', function () {
	// get the file
	const file = document.getElementById('image-file').files[0];
	if (file) {
		// upload the file
		const storage = firebase.storage();
		const user = firebase.auth().currentUser;
		const ref = storage.ref('users').child(user.uid).child('profile-image');
		const promise = ref.put(file);

		promise.then(function (image) {
			return image.ref.getDownloadURL();
		}).then(function (url) {
			user.updateProfile({
				url: url
			});
			document.getElementById('profile-image').src = url;
			document.getElementById('add-image').style.display = 'none';
			firebase.database().ref('users').child(user.uid).update({
				imageURL: url
			});
		});
	}

});
