import styled from 'styled-components';

export const PaginateNav = styled.nav`
	display: flex;
	justify-content: center;
	margin: 30px;
`;

export const PaginateUl = styled.ul`
    display: flex;
    list-style: none;
    &:active {
        backgroundColor: "#fedeff",
        color: "rgba(9,56,121,1)",
        transform: "translate(2px, 2px)",
    }
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
	margin-right: 20px;
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
`;

export const StyledImgNotFound = styled.img`
	box-shadow: #111 6px 6px;
	border: 2px solid #111;
	width: 280px;
	height: 400px;
	margin: 20px 0px;
	object-fit: cover;
`;
