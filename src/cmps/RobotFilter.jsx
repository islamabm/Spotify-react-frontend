import React, { Component, useEffect, useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate';
import { useForm } from '../customHooks/useForm';
import { useFormRegister } from '../customHooks/useFormRegister';

export function RobotFilter(props) {
    const [register] = useFormRegister({ ...props.filterBy }, props.onChangeFilter)


    return (
        <form className='robot-filter' >
            <section>
                <label htmlFor="model">Model</label>
                <input {...register('model', 'text')} />
            </section>
            <section>
                <label htmlFor="type">Type</label>
                <input {...register('type')} />
            </section>
            <section>
                <label htmlFor="minBatteryStatus">MinBatteryStatus</label>
                <input {...register('minBatteryStatus', 'number')} />
            </section>

            {/* {['model', 'type', 'minBatterStatus', 'maxBatteryStatus'].map((type) => {

                return <section key={type}>
                    <label htmlFor={type}>{type}</label>
                    <input {...register(type, 'text')} />
                </section>
            })
            } */}
        </form>
    )
}
