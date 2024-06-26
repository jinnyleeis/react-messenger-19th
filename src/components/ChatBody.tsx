
import React from 'react';
import {
	ChatBodyContainer,
	TimeDisplay,
	DateSeparator,
	ChatMessageBox,
    UserProfileImage
    
} from '../style/ChatBodyStyle';

interface Message {
	id: number;
	from: string;
	content: string;
	date: string;
}

interface ChatBodyProps {
	messages: Message[];
	currentUser: string;
    userImage: string;
}

const formatDate = (isoDateString: string) => {
	const date = new Date(isoDateString);
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const formatTime = (isoDateString: string) => {
	const date = new Date(isoDateString);
	return `${date.getHours().toString().padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
};

const ChatBody: React.FC<ChatBodyProps> = ({ messages,userImage, currentUser}) => {
	let lastDate = '';
    let lastMinute = '';


	return (
		<ChatBodyContainer>
			{messages.map((message, index) => {
				const messageDate = formatDate(message.date);
                const messageMinute = formatTime(message.date);
				let displayDateSeparator = false;
                let displayMinuteSeparator = false;

				if (messageDate !== lastDate) {
					lastDate = messageDate;
					displayDateSeparator = true;
				}

                if (messageMinute !== lastMinute) {
					lastMinute = messageMinute;
					displayMinuteSeparator = true;
				}

				return (
					<React.Fragment key={message.id}>
						{displayDateSeparator && (
							<DateSeparator>{formatDate(message.date)}</DateSeparator>
						)}
                        {displayMinuteSeparator && (
							 <TimeDisplay>{formatTime(message.date)}</TimeDisplay>
						)}
                   
						<ChatMessageBox isCurrentUser={message.from === currentUser}>
							<div>{message.content}</div>
						</ChatMessageBox>
                        <UserProfileImage src={userImage} isCurrentUser={message.from === currentUser}/>
					</React.Fragment>
				);
			})}
		</ChatBodyContainer>
	);
};

export default ChatBody;