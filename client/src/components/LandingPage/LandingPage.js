import styled from 'styled-components';

export const DivStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
`;

export const ButtonStyled = styled.button`
	font-family: 'Press Start 2P', cursive;
	font-size: 0.9rem;
	color: #fafafa;
	text-transform: uppercase;
	text-decoration: none;
	padding: 20px 20px;
	border: 2px solid #111;
	background: #572e7e;
	box-shadow: 3px 3px #111;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	margin-right: 15px;

	&:hover {
		background-color: #ddd;
		color: #111;
		transform: translateY(-2px);
	}

	&:active {
		box-shadow: #422800 2px 2px 0 0;
		transform: translate(2px, 2px);
	}
`;

export const ImgStyled = styled.img`
	height: 300px;
	width: 400px;
`;
