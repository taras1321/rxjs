import { from, fromEvent, interval, map, Observable, of, pipe, scan, timer, range } from 'rxjs'

const stream1$ = of(1, 2, 3)

stream1$.subscribe(val => {
    console.log('value:', val);
})

const arr$ = from([1, 2, 3]).pipe(
    scan((acc, v) => [...acc, v], [])
)

arr$.subscribe(console.log)

const stream$ = new Observable((observer) => {
    observer.next('First value')

    setTimeout(() => {
        observer.next('After 1000ms')
    }, 1000)

    setTimeout(() => {
        observer.complete()
    }, 1500)

    setTimeout(() => {
        observer.error('Soemthing went wrong')
    }, 2000)

    setTimeout(() => {
        observer.next('After 1200ms')
    }, 3000)
})

stream$.subscribe(
    (val) => console.log('Val:', val),
    (err) => console.log(err),
    () => console.log('complate')
)

stream$.subscribe({
    next(val) {
        console.log(val)
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('complate')
    }
})

fromEvent(document.querySelector('canvas'), 'mousemove')
    .pipe(
        map((e) => ({
            x: e.offsetX,
            y: e.offsetY,
            ctx: e.target.getContext('2d'),
        }))
    )
    .subscribe((pos) => {
        pos.ctx.fillRect(pos.x, pos.y, 2, 2)
    })

const clear$ = fromEvent(document.getElementById('clear'), 'click')

clear$.subscribe(() => {
    const canvas = document.querySelector('canvas')
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
})

const sub = interval(500).subscribe(v => console.log(v))

setTimeout(() => {
    sub.unsubscribe()
}, 2000)

timer(1500).subscribe((v) => console.log(v))

range(42, 10).subscribe(v => console.log(v))
