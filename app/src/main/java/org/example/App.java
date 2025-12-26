package org.example;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class App extends Application {

    private boolean xTurn = true;
    private Button[][] buttons = new Button[3][3];
    private Label status = new Label("Player X's Turn");

    @Override
    public void start(Stage stage) {

        GridPane grid = new GridPane();
        grid.setAlignment(Pos.CENTER);

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                Button btn = new Button("");
                btn.setPrefSize(100, 100);
                btn.setStyle("-fx-font-size: 24");

                int r = i, c = j;
                btn.setOnAction(e -> handleMove(btn, r, c));

                buttons[i][j] = btn;
                grid.add(btn, j, i);
            }
        }

        Button resetButton = new Button("Reset Game");
        resetButton.setOnAction(e -> resetGame());

        VBox root = new VBox(15, status, grid, resetButton);
        root.setAlignment(Pos.CENTER);

        stage.setScene(new Scene(root, 350, 420));
        stage.setTitle("Tic Tac Toe");
        stage.show();
    }

    private void handleMove(Button btn, int r, int c) {
        if (!btn.getText().isEmpty()) return;

        btn.setText(xTurn ? "X" : "O");

        if (checkWin()) {
            status.setText("Player " + btn.getText() + " Wins!");
            disableBoard();
        } else {
            xTurn = !xTurn;
            status.setText("Player " + (xTurn ? "X" : "O") + "'s Turn");
        }
    }

    private boolean checkWin() {
        for (int i = 0; i < 3; i++) {
            if (same(buttons[i][0], buttons[i][1], buttons[i][2])) return true;
            if (same(buttons[0][i], buttons[1][i], buttons[2][i])) return true;
        }
        return same(buttons[0][0], buttons[1][1], buttons[2][2]) ||
               same(buttons[0][2], buttons[1][1], buttons[2][0]);
    }

    private boolean same(Button a, Button b, Button c) {
        return !a.getText().isEmpty()
                && a.getText().equals(b.getText())
                && a.getText().equals(c.getText());
    }

    private void disableBoard() {
        for (Button[] row : buttons)
            for (Button b : row)
                b.setDisable(true);
    }

    private void resetGame() {
        xTurn = true;
        status.setText("Player X's Turn");

        for (Button[] row : buttons) {
            for (Button b : row) {
                b.setText("");
                b.setDisable(false);
            }
        }
    }

    public static void main(String[] args) {
        launch();
    }
}
