import { GameObject, System, Component, decorators, RESOURCE_TYPE, resource,Game } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img'
import { RendererSystem } from '@eva/plugin-renderer'
import { SpriteAnimation,SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation'


// @decorators.componentObserver({
//   Transform: ['position'],
// })
class PhysicalSystem extends System {

    static systemName = 'PhysicalSystem';
    static observerInfo = {
        Transform: ['position'],
    }
    gForce
    horizon
    left = 0;
    right = 750;
    solidPoints = [];
    goal

    debounceFlag = false;

    constructor(param) {
        super(param);
        this.initial(param);
    }
    /**
     * System 初始化用，可以配置参数，游戏未开始
     *
     * System init, set params, game is not begain
     * @param param init params
     */
    initial(param) {
        this.horizon = param.horizon;
        this.gForce = param.gForce;
        this.left = param.left;
        this.right = param.right;
        this.solidPoints = param.solidPoints ?? [];
        this.goal = param.goal ?? undefined;
        console.log(`Physical插件初始化成功`);
    }
    /**
     * System 被安装的时候，如果游戏还没有开始，那么会在游戏开始的时候调用。用于前置操作，初始化数据等。
     *
     * Called while the System installed, if game is not begain, it will be called while begain. use to pre operation, init data.
     */
    awake() { }
    /**
     * System 被安装后，所有的 awake 执行完后
     *
     * Called while the System installed, after all of systems' awake been called
     */
    start() { }
    /**
     * 每一次游戏循环调用，可以做一些游戏操作，控制改变一些组件属性。
     *
     * Called by every loop, can do some operation, change some property or other component property.
     */
    update() {
        const changes = this.componentObserver.clear();
        for (const changed of changes) {
            if (changed.componentName === 'Transform') {
                this.move(changed);
            }
        }
    }
    move(changed) {
        const { components, transform } = changed.gameObject;
        for (const component of components) {
            if (component.name === 'Physical') {
                const { speedInit, radius } = component;

                if (
                    transform.position.x > this.right ||
                    transform.position.x < this.left
                ) {
                    speedInit[0] = -speedInit[0];
                }
                if (transform.position.y > this.horizon) {
                    transform.position.y = this.horizon;
                    speedInit[1] = -speedInit[1];
                }
                if (this.debounceFlag === false) {
                    for (const pt of this.solidPoints) {
                        const delta = Math.pow((pt.x - transform.position.x), 2) + Math.pow((pt.y - transform.position.y), 2) - Math.pow(radius, 2);
                        if (delta < 0) {
                            speedInit[0] = -speedInit[0];
                            speedInit[1] = -speedInit[1];
                            this.debounceFlag = true;
                            setTimeout(() => {
                                this.debounceFlag = false;
                            }, 500);
                            break;
                        }
                    }
                }

                if (this.goal?.point && this.debounceFlag === false) {
                    const delta = Math.pow((this.goal?.point.x - transform.position.x), 2) + Math.pow((this.goal?.point.y - transform.position.y), 2)
                    if (delta < 100) {
                        window.playAnim();
                        this.debounceFlag = true;
                        setTimeout(() => {
                            this.debounceFlag = false;
                        }, 500);
                    }
                }

                speedInit[1] += this.gForce;
            }
        }
    }

    /**
     * 和 update?() 类似，在所有System和组件的 update?() 执行以后调用。
     *
     * Like update, called all of gameobject update.
     */
    lateUpdate() { }
    /**
     * 游戏开始和游戏暂停后开始播放的时候调用。
     *
     * Called while the game to play when game pause.
     */
    onPlay() { }
    /**
     * 游戏暂停的时候调用。
     *
     * Called while the game paused.
     */
    onPause() { }
    /**
     * System 被销毁的时候调用。
     * Called while the system be destroyed.
     */
    onDestroy() { }
}


class Physical extends Component {
    static componentName = 'Physical';

    speedInit;

    constructor(params) {
        super();
        this.speedInit = params.speedInit;
        this.radius = params.radius;
    }

    update() {
        const { gameObject } = this;
        const { x, y } = gameObject.transform.position;

        gameObject.transform.position = {
            x: x + this.speedInit[0],
            y: y + this.speedInit[1],
        };
    }
}



function createBackboard() {
    const backboard = new GameObject('backboard', {
        size: {
            width: 100,
            height: 238,
        },
    });

    backboard.addComponent(
        new Img({
            resource: 'backboard',
        })
    );
    return backboard;
}

function createBasketBack() {
    const basketBack = new GameObject('basketBack', {
        size: {
            width: 166,
            height: 158,
        },
        position: {
            x: 65,
            y: 160,
        },
    });

    basketBack.addComponent(
        new Img({
            resource: 'basketBack',
        })
    );
    return basketBack;
}
function createBasketFront() {
    const basetFront = new GameObject('board', {
        size: {
            width: 166,
            height: 157,
        },
        position: {
            x: 80,
            y: -760,
        },
        anchor: {
            x: 0,
            y: 1,
        },
    });

    const anim = basetFront.addComponent(
        new SpriteAnimation({
            resource: 'boardIdle',
            speed: 100,
        })
    );

    const playAnim = () => {
        anim.resource = 'boardGoal';
        setTimeout(() => {
            anim.resource = 'boardIdle';
        }, 900);
    };

    return { basetFront, playAnim };
}

function createBoard() {
    const board = new GameObject('boardContainer', {
        size: {
            width: 750,
            height: 1484,
        }
    });
    const boardContainer = new GameObject('boardContainer', {
        position: {
            x: 0,
            y: -920,
        },
        anchor: {
            x: 0,
            y: 1,
        },
    });

    const backContainer = new GameObject('boardContainer', {
        position: {
            x: 0,
            y: -920,
        },
        anchor: {
            x: 0,
            y: 1,
        },
    });

    boardContainer.addChild(createBackboard());
    backContainer.addChild(createBasketBack());

    board.addChild(backContainer);
    board.addChild(boardContainer)
    return board;
}

function createBackground() {
    const bg = new GameObject('bg', {
        size: { width: 750, height: 1624 },
        origin: { x: 0.5, y: 1 },
        position: {
            x: 0,
            y: 120,
        },
        anchor: {
            x: 0.5,
            y: 1,
        },
    });

    bg.addComponent(
        new Img({
            resource: 'bg',
        })
    );
    return bg;
}
function createBall(position) {
    const ball = new GameObject('ball', {
        size: { width: 79, height: 79 },
        origin: { x: 0.5, y: 0.5 },
        position,
        anchor: {
            x: 0,
            y: 0,
        },
    });

    ball.addComponent(
        new Img({
            resource: 'basketball',
        })
    );
    return ball;
}

const resources = [
    {
        name: 'basketball',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: 'https://gw.alicdn.com/tfs/TB1WF1R0Ez1gK0jSZLeXXb9kVXa-99-99.png',
            },
        },
        preload: true,
    },
    {
        name: 'backboard',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url:
                    'https://gw.alicdn.com/tfs/TB1a11YoRFR4u4jSZFPXXanzFXa-109-263.png',
            },
        },
        preload: true,
    },
    {
        name: 'bg',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url:
                    'https://gw.alicdn.com/tfs/TB15Upxqk9l0K4jSZFKXXXFjpXa-750-1624.jpg',
            },
        },
        preload: true,
    },
    {
        name: 'basketBack',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url:
                    'https://gw.alicdn.com/tfs/TB1Xerd0AY2gK0jSZFgXXc5OFXa-184-175.png',
            },
        },
        preload: true,
    },
    {
        name: 'boardIdle',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url:
                    'https://gw.alicdn.com/tfs/TB1LYwonSR26e4jSZFEXXbwuXXa-920-875.png',
            },
            json: {
                type: 'json',
                url:
                    'https://pages.tmall.com/wow/eva/3246284841596d87b60749e88e0e26cd.json',
            },
        },
        preload: true,
    },
    {
        name: 'boardGoal',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url:
                    'https://gw.alicdn.com/tfs/TB1ob_c0EY1gK0jSZFCXXcwqXXa-552-525.png',
            },
            json: {
                type: 'json',
                url:
                    'https://pages.tmall.com/wow/eva/dfefdd86474cded44bdc226549ae6d81.json',
            },
        },
        preload: true,
    },
];

resource.addResource(resources);

const game = new Game({
    systems: [
        new RendererSystem({
            canvas: document.querySelector('#canvas'),
            width: 750,
            height: 1484,
        }),
        new ImgSystem(),
        // new TransitionSystem(),
        new SpriteAnimationSystem(),
        // new RenderSystem(),
        // new EventSystem(),
        new PhysicalSystem({
            left: 120,
            right: 750,
            horizon: 1200,
            gForce: 1,
            solidPoints: [
                {
                    x: 120,
                    y: 758,
                },
                {
                    x: 220,
                    y: 758,
                },
            ],
            goal: {
                point: {
                    x: 170,
                    y: 758,
                },
            },
        }),
    ],
});

game.scene.transform.size.width = 750;
game.scene.transform.size.height = 1484;

const pos = {
    x: 500,
    y: 1100,
};

const ball = createBall(pos);
const throwBall = () => {
    const phy = new Physical({
        speedInit: [
            Number(document.getElementById('speedx').value),
            Number(document.getElementById('speedy').value),
        ],
        radius: 35,
    });
    ball.addComponent(phy);
    window.resetBall = () => {
        ball.removeComponent(phy);
        ball.transform.position = pos;
    };
};
const { basetFront, playAnim } = createBasketFront();

game.scene.addChild(createBackground());
game.scene.addChild(createBoard());
game.scene.addChild(ball);
game.scene.addChild(basetFront);



window.playAnim = playAnim;
window.game = game;
window.throwBall = throwBall;
