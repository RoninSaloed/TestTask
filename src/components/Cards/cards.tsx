import { CardsProps } from "./cards.props"
import './cards.css';


export const Cards = ({ counter, state, count, loading }: CardsProps): JSX.Element => {

    return (
        <div className='container' >

            <div id="card" className='cardTitle'>Working with GET request</div>
            <div className='cardList'>
                {state?.users.map((users: {
                    id: number,
                    name: string,
                    email: string,
                    phone: string,
                    photo: string,
                    position: string
                    registration_timestamp: number

                }) =>
                    <div>
                        <div className='Card' key={users.id}>
                            <img className='cardPhoto' src={users.photo} alt="" />

                            <div className='cardName'>{users.name}</div>
                            <div className='cardPosition'>{users.position}</div>
                            <div className='cardEmail'>{users.email}</div>
                            <div className='cardPhone'>{users.phone}</div>
                        </div>

                    </div>
                )}
            </div>
            <div className='cardBodyButton'>
                {
                    count < state?.total_pages ? <button className='cardButton' onClick={counter}>Show more</button> : <button className='cardButtonNone' onClick={counter} >Show more</button>
                }
            </div>

        </div>
    )
}
export default Cards