import React from 'react'
import ReactDOM from 'react-dom'
import update from 'immutability-helper'
import { DraggableContainer, DraggableChild } from './src/index'


const initialChildren = [
  { id: 1, background: '#8ce8df', size: 100, position: {x: 100, y: 10} },
  { id: 2, background: '#8ce8df', size: 100, position: {x: 400, y: 106} },
  { id: 4, background: '#d2aff6', size: 150, position: {x: 100, y: 316} },
  { id: 5, background: '#fee493', size: 200, position: {x: 480, y: 376} },
]

class Example extends React.Component {
  state = {
    children: initialChildren,
  }

  handleChange = (index, position) => {
    const children = update(this.state.children, {
      [index]: {position: {$set: position}},
    })

    this.setState({children})
  }

  render() {
    const containerStyle = {
      height: 600,
      boxShadow: '0 0 5px 1px #CCC inset',
      background: '#F5F8FA',
      color: '#4A4A4A',
      margin: 20,
    }

    return (
      <div>
        <style>{'.active { opacity: .5; }'}</style>
        <DraggableContainer style={containerStyle}>
          {
            this.state.children.map(({ id, background, size, position }, index) => {
              const style = {
                background,
                width: size,
                height: size,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'move',
              }

              return (
                <DraggableChild key={id} position={position} handleChange={position => this.handleChange(index, position)}>
                  <div className="item" style={style}>
                    <span>size: {size}</span>
                    <span>drag me</span>
                  </div>
                </DraggableChild>
              )
            })
          }
        </DraggableContainer>
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
