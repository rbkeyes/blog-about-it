// event handler for publishing new blog post
const updateFormHandler = async (event) => {
    event.preventDefault();

    // get elements from document
    const updateEl = document.querySelector('.update-title');
    console.log(updateEl);
    const user_id = updateEl.getAttribute('name');
    const title = updateEl.value.trim();
    const body = document.querySelector('.update-body').value.trim();

    console.log(user_id);
    console.log(title);
    console.log(body);

    // // get content id from pathname
    const getContentId = () => {
        const routeArr = window.location.pathname.split('/');
            return routeArr[routeArr.length-1];
        };
    
    const id = getContentId();
    console.log(id);

    try {
        // fetch route if there is a title & body
        if (title && body) {
            const response = await fetch(`/api/dashboard/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, body }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log(response);
                console.log('Success!')
                window.location.href=`/api/dashboard/${user_id}`;
                return;
            };
        };
    } catch (err) {
        console.error(err);
        alert('Unable to publish');
        return;
    };
};

document.querySelector('.update-form').addEventListener('submit', updateFormHandler);
