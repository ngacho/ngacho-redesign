const baseUrl = "https://api.ngacho.com";
const blogGallery = document.querySelector('.blog-gallery');
blogGallery.addEventListener('click', e => {
    if (e.target && e.target.nodeName == 'I' && e.target.className.includes("fa-trash")) {

        const id = e.target.className.replace("fa-solid fa-trash delete-", '');
        console.log(`delete ${id}`);

        fetch(`${baseUrl}/database/blogs/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(response => {
            // Process the response body and status code simultaneously
            Promise.all([response.text(), response.status])
                .then(([_, status]) => {
                    if (status === 200) {
                        const blogItem = document.getElementById(id);
                        blogItem.className += " deleted";
                    } else {
                        console.error(`ERROR LEVEL 2: ${err}`);
                    }
                }).catch((err) => {
                    console.error(`ERROR LEVEL 2: ${err}`);
                });
        }).catch((_) => {
            console.error(`ERROR LEVEL 1: ${err}`);
        });
    }
});