namespace Game {

    export interface SceneInterface {

        input(keys: any, down: boolean): void;
        render(ctx: CanvasRenderingContext2D): void;
        update(): void;

    }

    export class Scene implements SceneInterface {

        row: number = 9; // active row
        index: number = 28; // active platform
        speed: number = .05; // move speed
        hero: Hero = new Hero();
        platforms: Platform[] = [];

        constructor() {
            for (let z = -9; z < 2; z++) {
                for (let x = -1; x <= 1; x++) {
                    let platform = new Platform();
                    platform.transform.translate.set(x, -1, z);
                    this.platforms.push(platform);
                }
            }
            return this;
        }

        input(keys: any, down: boolean): void {
            const pos = this.hero.pos;
            if ((keys.ArrowLeft || keys.KeyA) && down && pos.x >= 0) {
                pos.x--;
            }
            if ((keys.ArrowRight || keys.KeyD) && down && pos.x <= 0) {
                pos.x++;
            }
        }
        
        render(ctx: CanvasRenderingContext2D): void {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.translate(Math.round(ctx.canvas.width / 2), Math.round(ctx.canvas.height / 1.2));
            ctx.scale(64, 64);
            this.platforms.forEach((platform, i) => {
                platform.render(ctx);
            });
            this.hero.render(ctx);
            ctx.restore();
        }
        
        update(): void {
            this.hero.update();
            this.platforms.forEach(platform => {
                let pos = platform.transform.translate;
                pos.z += this.speed;
                if (pos.z > 2) {
                    pos.z -= 11;
                }
                let scale = 1;
                if (pos.z < -8) {
                    scale = pos.z + 9;
                } else if (pos.z > 1) {
                    scale = 2 - pos.z; 
                }
                platform.transform.scale.set(scale, scale, scale);
            });
            this.row -= this.speed;
            if (this.row <= -.5) {
                this.row += 11; 
            }
            this.index = Math.round(this.row) * 3 + Math.round(this.hero.transform.translate.x) + 1;
        }

    }

}