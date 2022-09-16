import update from 'immutability-helper'
import type { FC } from 'react' // FunctionalComponent
import { useCallback, useState } from 'react'

import { Card } from './Card'

const style = {
    width: 400,
}

export interface Item {
    id: number
    text: string
}

export const Container: FC = () => {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Write a cool JS library',
            },
            {
                id: 2,
                text: 'Make it generic enough',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create some examples',
            },
            {
                id: 5,
                text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            },
            {
                id: 6,
                text: '???',
            },
            {
                id: 7,
                text: 'PROFIT',
            },
        ])

        const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
            setCards((prevCards: Item[]) =>
                // This is a drop-in replacement for react-addons-update:
                // https://github.com/kolodny/immutability-helper only copying objects that need to be changed and by reusing the objects that haven't changed.
                update(prevCards, {
                    // for each item in arrays call splice() on the target with the parameters provided by the item. Note: The items in the array are applied sequentially, so the order matters. The indices of the target may change during the operation.
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex] as Item],
                    ],
                }),
            )
        }, [])

        const renderCard = useCallback(
            (card: { id: number; text: string }, index: number) => {
                return (
                    <Card
                        key={card.id}
                        index={index}
                        id={card.id}
                        text={card.text}
                        moveCard={moveCard}
                    />
                )
            },
            [],
        )

        return (
            <>
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
            </>
        )
    }
}
