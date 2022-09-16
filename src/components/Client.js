import Avatar from 'react-avatar';

function Client({username}) {
    return (
    <div className='text-center'>
        <Avatar name={username} size="50px" round="14px"/>
        <p className='text-sm mt-1'>{username}</p>
    </div>);
}

export default Client;