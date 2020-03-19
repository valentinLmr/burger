import React from 'react';
import style from './Spiner.module.css'
const spiner = () => (
    <div className={style.FoldingCube}>
    <div className={[style.Cube1, style.Cube].join (' ')}></div>
    <div className={[style.Cube2, style.Cube].join (' ')}></div>
    <div className={[style.Cube4, style.Cube].join(' ')}></div>
    <div className={[style.Cube3, style.Cube].join(' ')}></div>
  </div>
)

export default spiner