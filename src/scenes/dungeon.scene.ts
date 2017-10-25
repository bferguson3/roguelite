import { Color, LockedCamera, Scene, TileMap, TileSprite } from "excalibur";

import { Hero } from "../actors";
import { Game } from "../engine";
import { CaveType } from "../enums";
import { Resources } from "../resources";
import { CaveSpriteSheet } from "../spritesheets";

export class DungeonScene extends Scene {

    public sceneName: string = "DungeonScene";

    private mapRows: number = 35;
    private mapColumns: number = 50;
    private spriteWidth: number = 16;
    private spriteHeight: number = 16;
    private caveSpriteSheetName: string = "caveSpriteSheet";
    private mapName: string = "caveMap";

    private backgroundColor: Color = new Color(32, 23, 41);
    private caveSpriteSheet: CaveSpriteSheet;
    private hero: Hero;

    private tileMap: TileMap;

    constructor(hero: Hero) {
        super();

        this.hero = hero;
    }

    public onInitialize(game: Game) {

        console.log(this.hero);

        this.add(this.hero);

        const camera = new LockedCamera();
        camera.setActorToFollow(this.hero);

        this.camera = camera;

        const resources = game.loader.resources;

        this.caveSpriteSheet = new CaveSpriteSheet(resources);
        
        game.backgroundColor = this.backgroundColor;

        console.log("Loading map");

        let x = game.canvasWidth / 2 * -1;
        let y = game.canvasHeight / 2 * -1;

        this.tileMap = new TileMap(
            x, 
            y, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.mapRows, 
            this.mapColumns);

        this.tileMap.registerSpriteSheet(
            this.caveSpriteSheetName,
            this.caveSpriteSheet);

        for (let i = 0; i < this.mapRows; i++) {

            for( let j = 0; j < this.mapColumns; j++) {

                let tileSprite: TileSprite;

                if (i == 0) {
                    if (j == 0) {
                        tileSprite = new TileSprite(
                            this.caveSpriteSheetName,
                            CaveType.TopLeftWall);
                    } else if(j == this.mapColumns - 1) {
                        tileSprite = new TileSprite(
                            this.caveSpriteSheetName,
                            CaveType.TopRightWall);
                    } else {
                        tileSprite = new TileSprite(
                            this.caveSpriteSheetName,
                            CaveType.TopWall);
                    }
                }
                else if (i == this.mapRows - 1){ 
                    if (j == 0) {
                        tileSprite = new TileSprite(
                            this.caveSpriteSheetName,
                            CaveType.BottomLeftWall);
                    } else if(j == this.mapColumns - 1) {
                        tileSprite = new TileSprite(
                            this.caveSpriteSheetName,
                            CaveType.BottomRightWall);
                    } else {
                        tileSprite = new TileSprite(
                            this.caveSpriteSheetName,
                            CaveType.BottomWall);
                    }
                }
                else if (j == 0) {
                    tileSprite = new TileSprite(
                        this.caveSpriteSheetName,
                        CaveType.LeftWall);
                }
                else if (j == this.mapColumns - 1) {
                    tileSprite = new TileSprite(
                        this.caveSpriteSheetName,
                        CaveType.RightWall);
                } else {
                    tileSprite = new TileSprite(
                        this.caveSpriteSheetName,
                        CaveType.Floor);
                }

                let cellIndex = j + (i * this.mapColumns);

                this.tileMap.getCellByIndex(cellIndex).pushSprite(tileSprite);
            }
        }

        this.add(this.tileMap)

        console.log("Dungeon scene", this);
    }
}