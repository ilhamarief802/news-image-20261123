# ilhamarief802/news-image-20261123

[![make.fun · news-image-20261123](https://make.fun/badge/news-image-20261123.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![rank](https://make.fun/badge/news-image-20261123/ilhamarief802/news-image-20261123/rank.svg)](https://make.fun/bounty/news-image-20261123/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![reward](https://make.fun/badge/news-image-20261123/ilhamarief802/news-image-20261123/reward.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)

One front page for Monday 23 November 2026: six stories given a card each, four
more in a strip along the bottom, the day's date set across the top. Drawn as a
1024x1024 PNG; the program ships it to `/output/entry.png` unchanged.

## What the picture says

| Where | Beat | Story |
| --- | --- | --- |
| Ukraine | War | Long-range drones hit two Russian oil refineries |
| London / Myanmar | Diplomacy | Britain recognises the Rohingya genocide and sanctions five generals |
| Quebec | Courts | The court restores the oath to King Charles III for legislators |
| Madrid | Courts | Spain amnesties Puigdemont, closing the Catalan case |
| Tehran | Rights | Parastoo Ahmadi takes 74 lashes for a concert without a hijab |
| World | Football | FIFA names the 2031 and 2035 Women's World Cup hosts |

Along the bottom, four one-liners: Awami League factions clash in Bangladesh
(30 hurt), bomb threats close out hundreds of schools in Denmark and Germany,
Tajikistan starts withdrawing from the ICC, and the PKK quits 14 more bases in
northern Iraq.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That writes `out/entry.png`. Inside the grader the same program writes
`/output/entry.png`; it reads nothing but its own `entry.png`, so two runs give
the same bytes.
