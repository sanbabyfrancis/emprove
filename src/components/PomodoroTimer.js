import React from "react"
import Axios from "axios"

function displayFormat(sec) {
    var m = Math.floor(sec / 60)
    var s = Math.floor(sec % 60)
    return m + ":" + s
}

class Timer extends React.Component {
    render() {
        if (this.props.timeLeft == 0) {
            // bug
            document.getElementById('end-of-time').play()
            Axios.post("/pomodoro-count", {email: this.props.email})
        }
        if (this.props.timeLeft == null || this.props.timeLeft == 0)
            return <div />
        return <h4 style={{color: "red", marginTop: "10px"}}>Time left: {displayFormat(this.props.timeLeft)}</h4>
    }
}

class Button extends React.Component {
    startTimer(event) {
        return this.props.startTimer(this.props.time)
    }
    render() {
        return <button
            type="button"
            className='btn btn-sm btn-secondary'
            onClick={() => { this.props.startTimer(this.props.time) }}>
            {this.props.label}
        </button>
    }
}

class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { timeLeft: null, timer: null }
        this.startTimer = this.startTimer.bind(this)
    }
    
    startTimer(timeLeft) {
        clearInterval(this.state.timer)
        let timer = setInterval(() => {
            var timeLeft = this.state.timeLeft - 1
            if (timeLeft == 0) clearInterval(timer)
            this.setState({ timeLeft: timeLeft })
        }, 1000)
        return this.setState({ timeLeft: timeLeft, timer: timer }) // 300
    }
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h4>Pomodoro Timer</h4>
                    <div className="btn-group" role="group"> 
                        <Button time="1500" label="Pomodoro Session" startTimer={this.startTimer} />
                        <Button time="5" label="Short Break" startTimer={this.startTimer} />
                        <Button time="900" label="Long Break" startTimer={this.startTimer} />
                    </div>
                    <Timer timeLeft={this.state.timeLeft} email={this.props.email}/>
                    <audio id="end-of-time" src="notification.wav" preload="auto"></audio>
                </div>
            </div>
        )
    }
}

export default PomodoroTimer