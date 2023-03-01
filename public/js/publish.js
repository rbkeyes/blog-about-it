// event handler for publishing new blog post
const blogFormHandler = async (event) => {
    event.preventDefault();

    // get elements from document
    const title = document.getElementById('blog-title').value.trim();
    const body = document.getElementById('blog-body').value.trim();

    try {
        // fetch route if there is a title & body
        if (title && body) {
            const response = await fetch(`/api/dashboard/publish`, {
                method: 'POST',
                body: JSON.stringify({ title, body }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log(response);
                console.log('Success!')
                window.location.href=`/api/dashboard`;
                return;
            };
        };
    } catch (err) {
        console.error(err);
        alert('Unable to publish');
        return;
    };
};

document.querySelector('.blog-form').addEventListener('submit', blogFormHandler);
