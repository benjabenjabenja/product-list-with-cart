import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import './App.css';

import { Button } from './components/ui/button';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProducts from './pages/ListProducts';
import useProducts from './hooks/useProducts';
import { Tag } from './assets/data';
import { UUID } from 'crypto';

export type H1Props = {
	children: ReactNode;
}
export type Product = {
	productName: string;
	price: number;
	tag: Tag;
	count: number;
	id: UUID
}
export type ArrowFuntionVoid = (value?: any | undefined) => void;


const WrapperPage = styled('main')`
  display: flex;
  align-items: center;
  width: 100%;
  heigth: 100vh;
`;

const App: FC = () => {
	const { products } = useProducts();
	return (
		<WrapperPage>
			<Router>
				<Routes>
					<Route index path='/' element={<ListProducts productList={products} />} />
				</Routes>
			</Router>
		</WrapperPage>
	);
}

export default App;
