// event handler for publishing new blog post
const commentFormHandler = async (event) => {
    event.preventDefault();

    // get elements from document
    const comment = document.querySelector('.form-comment');
    const input = comment.value.trim();
    const content_id = comment.getAttribute('name');
    console.log(comment);
    console.log(input);
    console.log(content_id);


    try {
        // fetch route if there is a title & body
        if (input) {
            const response = await fetch(`/api/comment/${content_id}`, {
                method: 'POST',
                body: JSON.stringify({ comment_body, content_id }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log(response);
                console.log('Success!')
                window.location.href=`/api/comment/${content_id}`;
                return;
            };
        };
    } catch (err) {
        console.error(err);
        alert('Unable to publish');
        return;
    };
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);