import styled from 'styled-components';

export const PaginateNav = styled.nav`
	display: flex;
	justify-content: center;
	margin: 30px;
	@media (max-width: 768px) {
		margin-bottom: 0px;
	}
`;

export const PaginateUl = styled.ul`
    display: flex;
	flex-direction: row;
	padding-inline-start: 0;
    list-style: none;
    &:active {
        backgroundColor: "#fedeff",
        color: "rgba(9,56,121,1)",
        transform: "translate(2px, 2px)",
    }
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const PaginateDiv = styled.div`
	display: flex;
	justify-content: center;
`;

export const PaginateButton = styled.button`
	font-family: 'Press Start 2P', cursive;
	font-size: 1rem;
	color: #fafafa;
	text-transform: uppercase;
	text-decoration: none;
	padding: 15px 20px;
	border: 2px solid #111;
	background: rgba(9, 56, 121, 1);
	box-shadow: 3px 3px #111;
	cursor: pointer;
	margin: 0 15px 0 15px;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: #fedeff;
		color: rgba(9, 56, 121, 1);
		transform: translateY(-4px);
	}

	&:active {
		background-color: #fedeff;
		color: rgba(9, 56, 121, 1);
		transform: translate(2px, 2px);
	}

	&.active {
		background-color: #fedeff;
		color: rgba(9, 56, 121, 1);
		transform: translate(2px, 2px);
	}

	@media (max-width: 768px) {
		margin-bottom: 10px;
	}
`;

export const PaginatePlus = styled.button`
	font-family: 'Press Start 2P', cursive;
	font-size: 1rem;
	color: #fafafa;
	text-transform: uppercase;
	text-decoration: none;
	padding: 15px 20px;
	border: 2px solid #111;
	background: rgba(9, 56, 121, 1);
	box-shadow: 3px 3px #111;
	cursor: pointer;
	margin: 0 15px 0 15px;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: #fedeff;
		color: rgba(9, 56, 121, 1);
		transform: translateY(-4px);
	}

	@media (max-width: 768px) {
		display: none;
	}

	@media (max-width: 1280px) {
		&:hover {
			background-color: rgba(9, 56, 121, 1);
			color: #fafafa;
			transform: none;
		}
	}
`;

export const StyledImgNotFound = styled.img`
	box-shadow: #111 6px 6px;
	border: 2px solid #111;
	width: 280px;
	height: 400px;
	margin: 20px 0px;
	object-fit: cover;
`;

export const StyledP = styled.span`
	font-family: 'Press Start 2P', cursive;
	font-size: 1rem;
	color: #fafafa;
	align-self: end;

	@media (max-width: 768px) {
		display: none;
	}
`;
