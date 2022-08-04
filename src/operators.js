import { filter, fromEvent, interval, map, reduce, scan, switchMap, take, takeLast, takeWhile, tap } from 'rxjs'

fromEvent(document, 'click')
    .pipe(
        switchMap((e) => {
            return interval(1000).pipe(
                tap((v) => console.log(v)),
                take(5),
                reduce((acc, v) => acc + v, 0)
            )
        })
    )
    .subscribe({
        next: (v) => console.log('next', v),
        complete: () => console.log('complete'),
    })

const stream$ = interval(1000).pipe(
    tap((v) => console.log('tap', v)),
    map((v) => v * 3),
    filter((v) => v % 2 === 0),
    take(5),
    takeLast(2),
    takeWhile((v) => v < 5),
    scan((acc, v) => acc + v, 0),
    reduce((acc, v) => acc + v, 0)
)

stream$.subscribe({
    next: (v) => console.log('next', v),
    complete: () => console.log('complete'),
})
