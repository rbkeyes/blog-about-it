// event handler for publishing new blog post
const blogFormHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    
    console.log({title, content})

    try {
        if (title && content) {
            const response = await fetch('/api/dashboard/publish', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log(response);
                console.log('Success!')
                document.location.replace('/api/dashboard');
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
