// event handler for updating an existing post by content.id
const updateFormHandler = async (event) => {
    event.preventDefault();

    // get elements from document
    const updateEl = document.querySelector('.update-title');
    const user_id = updateEl.getAttribute('name');
    const title = updateEl.value.trim();
    const body = document.querySelector('.update-body').value.trim();

    // // get content id from pathname
    const getContentId = () => {
        const routeArr = window.location.pathname.split('/');
            return routeArr[routeArr.length-1];
        };
    
    const id = getContentId();

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
        alert('Unable to update');
        return;
    };
};

document.querySelector('.update-form').addEventListener('submit', updateFormHandler);


// event handler to delete post by content.id
const deletePostHandler = async(event) => {
    event.preventDefault();

    // get user_id
    const updateEl = document.querySelector('.update-title');
    const user_id = updateEl.getAttribute('name');
    // get content id
    const getContentId = () => {
        const routeArr = window.location.pathname.split('/');
            return routeArr[routeArr.length-1];
        };
    
    const id = getContentId();
    console.log(id);

    try {
            const response = await fetch(`/api/dashboard/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log(response);
                console.log('Success!')
                window.location.href=`/api/dashboard/${user_id}`;
                return;
            };
    } catch (err) {
        console.error(err);
        alert('Unable to delete');
        return;
    };
};

document.querySelector('.delete-entry').addEventListener('submit', deletePostHandler);