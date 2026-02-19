import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

// Checking for mantine 
function Demo() {
    return (
        <div className='flex justify-between'>
            {/* With image */}
            <Avatar src="avatar.png" alt="it's me" />

            {/* Default placeholder */}
            <Avatar radius="xl" />

            {/* Letters with xl radius */}
            <Avatar color="cyan" radius="xl">MK</Avatar>

            {/* Custom placeholder icon */}
            <Avatar color="blue" radius="sm">
                <IconStar size={20} />
            </Avatar>
        </div>
    );
}

export default Demo;