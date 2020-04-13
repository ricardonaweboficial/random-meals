import React, { useState, useEffect, Fragment } from 'react';

import './global.css';
import './App.css';
import './ContainerGrid.css';

import './aside.css';
import './header.css';
import './section.css';
import './footer.css';


function App() {
	const [ meals, setMeals ] = useState([]);
	const [ viewMeals, setViewMeals ] = useState(false);

	const [ search, setSearch ] = useState(true);

	const [ count, setCount ] = useState([]);
 
	useEffect(() => {
		async function loadMeal() {
			const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

			const data = await response.json();
		
			setMeals(data.meals);

		}
		loadMeal();

	}, [search]);

	useEffect(() => {
		var arr = [];
			for (var i = 1; i <= 20; i++) {
				arr.push(i);
			}
		setCount(arr);

		setViewMeals(true);
	}, []);

	return (
		<div id="app">
			{viewMeals && (
				<div className="container">
					{ meals.map(meal => (
						<Fragment key={meal.idMeal}>
							<aside>
								<div className="imageMeal">
									<img src={meal.strMealThumb} alt="MealImg"/>
								</div>		

								<div className="ingredientsMeal">
									<p>Ingredients</p>
									<ul>
										{count.map(ingredient => {
											if(meal[`strIngredient${ingredient}`] !== '' && meal[`strIngredient${ingredient}`] !== null) {
												return <li key={ingredient}><span>{meal[`strIngredient${ingredient}`]}</span>{' - '+meal[`strMeasure${ingredient}`]}</li>		
											}
											 
										})}
									</ul>
								</div>							

							</aside>
							<header>
								<div className="nameMeal">
									<label htmlFor="meal">Name:</label>
									<h1 name="meal">{meal.strMeal}</h1>
									<label htmlFor="drinkAlternate">Alternate Drink:</label>
									<h3>{meal.strDrinkAlternate === null ? 'Without Drink' : meal.strDrinkAlternate}</h3>
								</div>

								<div className="originCategory">
									<nav>
										<label htmlFor="origin">Origin:</label>
										<h3 name="origin">{meal.strArea}</h3>
										<label htmlFor="drinkAlternate">Category:</label>
										<h3 name="drinkAlternate">{meal.strCategory}</h3>
									</nav>
								</div>

							</header>
							<section>
								<h1>Instruction</h1>
								<p>{meal.strInstructions}</p>

							</section>
							<footer>
								<div className="random-meals">
									<button onClick={() => setSearch(!search)}>Random Meals</button>
								</div>
								<div className="videoMeal">
									<iframe id="video" src={`http://www.youtube.com/embed/${meal.strYoutube.slice(32)}`}
									  allowFullScreen
									></iframe>
								</div>
							</footer>
						</Fragment>
					))}
				</div>
			)}
		</div>
	);
}

export default App;
