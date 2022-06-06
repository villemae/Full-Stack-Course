
const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    console.log(exercises)
    const init = 0
    const sum = exercises.reduce((previousValue, currentValue) => 
    previousValue + currentValue, init)
    console.log(sum)
    return (
        <p> Total number of exercises: {sum}</p>
    )
}


const Header = ({ course }) => <h2>{course}</h2>


const Part = ({ part }) => 
    <li>{part.name} {part.exercises}</li>


const Content = ({ parts }) => {
    return (
    <>
        <ul>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </ul>
        <Total parts={parts} />
    </>
    )
}


const Course = ({course}) => {
    return (
        <li>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </li>
    )
}

export default Course