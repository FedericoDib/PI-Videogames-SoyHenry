import styled from 'styled-components';

export const DivContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 30px;
`;

export const DivSelectStyled = styled.div`
	select {
		cursor: pointer;
		font-family: 'Press Start 2P', cursive;
		margin: 0 20px 10px 20px;
		padding: 10px;
		border: 2px solid #111;
		color: #111;
		box-shadow: 3px 3px #111;
		transition: 0.3s;
	}
`;

export const ButtonStyled = styled.button`
	font-family: 'Press Start 2P', cursive;
	color: #ddd;
	text-transform: uppercase;
	text-decoration: none;
	padding: 10px 10px;
	border: 2px solid #111;
	background: #572e7e;
	box-shadow: 3px 3px #111;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	margin-right: 15px;
	&:hover {
		background: #111;
		color: #ddd;
	}
`;
