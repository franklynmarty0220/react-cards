import React, {useState, useEffect, useRef} from "react";
import Cards from "./Cards"
import axios from "axios";

const API_URL = "http://deckofcardsapi.com/api/deck"

const Deck = () =>{
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [autoDrawn, setAutoDrawn] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function getDeck(){
            let res = await axios.get(`${API_URL}/new/shuffle/`)
            setDeck(res.data);
        }
        getDeck();
    },[setDeck])

    useEffect(() =>{
        async function getCard(){
            let {deck_id} = deck;

            let res = await axios.get(`${API_URL}/${deck_id}/draw`)

            if (res.data.remaining === 0) {
                setAutoDrawn(false);
                throw new Error("No Cards Remaining!")
            }

            const {code, suite, value, image} = res.data.cards[0];

            setDrawn(d => [
                ...d,
                {
                    id: code,
                    name: suite + " " + value,
                    image: image
                    
                }
            ])


        };

        if (autoDraw && !timerRef.current) {
            timerRef.current = setInterval(async () => {
              await getCard();
            }, 1000);
          }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, [autoDrawn, setAutoDrawn, deck])

    const toggleAutoDraw = () => {
        setAutoDrawn(auto => !auto);
    }

    const cards = drawn.map(({id,name,image})=> (
        <Cards key={id} name={name} image={image}/>
    ));

    return (
        <div>
            {deck ? (
            <button onClick={toggleAutoDraw}>
                {autoDrawn ? "Stop" : "Keep"} Draw!
            </button>
            ) : null}
            <div >{cards}</div>
        </div>
    )
}

export default Deck;