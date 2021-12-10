using Microsoft.EntityFrameworkCore.Migrations;

namespace GCFinalGroupProject.Data.Migrations
{
    public partial class addconsecutivewins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Money",
                table: "userInventories",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ConsecutiveWins",
                table: "userInventories",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConsecutiveWins",
                table: "userInventories");

            migrationBuilder.AlterColumn<int>(
                name: "Money",
                table: "userInventories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
