using Microsoft.EntityFrameworkCore.Migrations;

namespace GCFinalGroupProject.Data.Migrations
{
    public partial class createTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "heroShop",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeroID = table.Column<int>(nullable: true),
                    HeroName = table.Column<string>(nullable: true),
                    HeroPrice = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_heroShop", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "itemShop",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemName = table.Column<string>(nullable: true),
                    ItemDescription = table.Column<string>(nullable: true),
                    ItemPrice = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_itemShop", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "userInventories",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(nullable: true),
                    HeroID = table.Column<int>(nullable: false),
                    ItemOne = table.Column<int>(nullable: true),
                    ItemTwo = table.Column<int>(nullable: true),
                    Money = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userInventories", x => x.ID);
                    table.ForeignKey(
                        name: "FK_userInventories_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_userInventories_UserID",
                table: "userInventories",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "heroShop");

            migrationBuilder.DropTable(
                name: "itemShop");

            migrationBuilder.DropTable(
                name: "userInventories");
        }
    }
}
