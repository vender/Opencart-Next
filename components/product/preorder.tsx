"use client"
import Button from "#/components/ui/button";
import { GoBell } from "react-icons/go";
import { useState } from 'react';

export default function Preorder({isLogedIn, product}:any) {
    const [editing, setEditing] = useState(false);

    const preorderAdd = async () => {
        if(isLogedIn && product) {
            setEditing(true);

            const response = await fetch(`/api/preorder`, {
                method: 'POST',
                body: JSON.stringify({
                    product_id: product.product_id,
                    name: `${isLogedIn.firstname} ${isLogedIn.lastname}`,
                    email: isLogedIn.email
                })
            });
            const data:{status:number} = await response.json();
            if(data?.status == 204) {
                alert('Вы подписались на уведомление о поступлении товара.');
                setEditing(false);
            }
        } else {
            alert('Войдите, что бы включить уведомления!');
        }
    }
    
    return (
        <div className='flex gap-x-2 items-center justify-between'>
            <h3 className='text-xs'>Нет в наличии</h3>
            <Button 
                    onClick={() => preorderAdd()}
                    title="Уведомить о поступлении товара"
                    className="bg-heading text-white px-3 md:px-3 lg:px-2 py-3 md:py-3 lg:py-2 hover:text-white hover:bg-gray-600"
                    variant="notify"
                    loading={editing}
                >
                    <GoBell className='text-white' />
            </Button>
        </div>
    )
}
