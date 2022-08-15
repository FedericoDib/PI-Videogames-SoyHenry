import styled from 'styled-components';

export const FormStyled = styled.form`
	font-family: 'Press Start 2P', cursive;
	letter-spacing: 1px;
	font-size: 0.8rem;
	text-transform: uppercase;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding: 30px 0;
`;

export const DivFormStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 60%;
	border: 2px solid #ddd;
	color: #ddd;
	background-image: linear-gradient(
		89.7deg,
		rgba(132, 53, 142, 1) 2.8%,
		rgba(0, 32, 95, 1) 97.8%
	);
	padding: 40px;
	box-shadow: 7px 7px #111;

	@media (max-width: 768px) {
		width: 100%;
		margin: 0 20px;
		padding: 10px 10px 30px 10px;
	}
`;

export const DivTitle = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	width: 100%;

	@media (max-width: 768px) {
		flex-direction: column-reverse;
		button {
			margin: 30px 0 0 30px;
		}
		h1 {
			margin: 20px 0 0 0;
			color: #fff;
		}
	}
`;

export const DivStyled = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	margin-top: 20px;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const DivInputsStyled = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 40px;
	input,
	textarea {
		font-family: 'Press Start 2P', cursive;
		width: 100%;
		padding: 10px;
		border: 2px solid #111;
		color: #111;
		box-shadow: 3px 3px #111;
		align-items: left;
		padding-left: 1.5rem;
		resize: none;
		&:focus {
			outline: none;
		}
		&.error {
			border: 2px solid hsl(0, 69%, 50%);
			box-shadow: 3px 3px hsl(10, 95%, 21%);
		}
	}
	textarea {
		margin-bottom: 10px;
		&.error {
			border: 2px solid hsl(0, 69%, 50%);
			box-shadow: 3px 3px hsl(10, 95%, 21%);
		}
	}
	label {
		font-size: 0.85rem;
		width: 30%;
		text-align: left;
		margin: 20px;
	}
	select {
		font-family: 'Press Start 2P', cursive;
		width: 80%;
		margin: 0 20px 10px 20px;
		padding: 10px;
		border: 2px solid #111;
		color: #111;
		box-shadow: 3px 3px #111;
		&:focus {
			outline: none;
		}
		&.error {
			border: 2px solid hsl(0, 69%, 50%);
			box-shadow: 3px 3px hsl(10, 95%, 21%);
		}
	}

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 10px;
		input,
		textarea {
			width: auto;
			margin-bottom: 0;
		}
		select {
			width: 100%;
			margin: 0;
		}
		label {
			margin-left: 0;
		}
	}
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
		background-color: #fedeff;
		color: rgba(9, 56, 121, 1);
		transform: translateY(-4px);
	}
	@media (max-width: 768px) {
		margin-right: 0;
		margin-top: 20px;
	}
`;

export const DivSelectButton = styled.div`
	display: flex;
	background-color: #111;
	color: #fafafa;
	margin: 5px;
	padding: 10px;
	border: 2px solid #ddd;
	button {
		padding: 5px;
		margin: 5px 0px;
	}
	@media (max-width: 768px) {
		margin-top: 15px;
	}
`;

export const DivGPStyled = styled.div`
	display: flex;
	width: 50%;
	flex-direction: column;
	align-items: center;
	span {
		text-align: center;
	}

	@media (max-width: 768px) {
		width: 100%;
		align-items: flex-start;
		margin-top: 20px;
	}
`;

export const SpanStyled = styled.span`
	text-align: end;
	padding: 0 10px;
	width: 100%;
	font-size: 0.6rem;
	border-radius: 5px;
	color: hsl(0, 69%, 50%);
`;
