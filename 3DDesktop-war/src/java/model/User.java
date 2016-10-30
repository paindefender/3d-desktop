package model;

import java.sql.*;
import java.io.Serializable;

public class User implements Serializable{
    private String name;
    private transient String password;
    
    public User(String name, String password){
        this.name = name;
        this.password = password;
    }
    
    public String getName(){
        return name;
    }
    
    public String getPassword(){
        return password;
    }
    
    public void setName(String name){
        this.name = name;
    }
    
    public void setPassword(String password){
        this.password = password;
    }
    
    public static void addUser(User user) throws SQLException, ClassNotFoundException{
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/3ddesktop", "root", "root");
        PreparedStatement stmt = conn.prepareStatement("insert into users(name, password) values(?, ?);");
        stmt.setString(1, user.getName());
        stmt.setString(2, user.getPassword());
        stmt.execute();
        conn.close();
    }
    
    public static User getUserByName(String name) throws ClassNotFoundException, SQLException{
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/3ddesktop", "root", "root");
        PreparedStatement stmt = conn.prepareStatement("select * from users where name = ?;");
        stmt.setString(1, name);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()){
            if (rs.getString("name").equals(name)){
                break;
            }
        }
        User user = new User(name, rs.getString("password"));
        return user;
    }
    
    public static int getIdByName(String name) throws SQLException, ClassNotFoundException{
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/3ddesktop", "root", "root");
        PreparedStatement stmt = conn.prepareStatement("select * from users where name = ?;");
        stmt.setString(1, name);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()){
            if (rs.getString("name").equals(name)){
                break;
            }
        }
        int id = rs.getInt("id");
        return id;
    }
    
    public static User getUserById(int id) throws ClassNotFoundException, SQLException{
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/3ddesktop", "root", "root");
        PreparedStatement stmt = conn.prepareStatement("select * from users where id = ?;");
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()){
            if (rs.getString("id").equals(id)){
                break;
            }
        }
        User user = new User(rs.getString("name"), rs.getString("password"));
        return user;
    }
    
}
