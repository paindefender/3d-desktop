package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.User;

@WebServlet(urlPatterns = {"/login"})
public class Login extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        /*response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Login</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Login at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }*/
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session != null){
            //response.sendRedirect("");
            session.invalidate();
        }
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "  <head>\n" +
                        "    <meta charset=\"utf-8\">\n" +
                        "    <title>Login page</title>\n" +
                        "  </head>\n" +
                        "  <body>\n" +
                        "    <form action=\"login\" method=\"post\">\n" +
                        "      <table>\n" +
                        "        <tr>\n" +
                        "          <td>Username</td><td><input type=\"text\" name=\"name\"></td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "          <td>Password</td><td><input type=\"password\" name=\"password\"></td>\n" +
                        "        </tr>\n" +
                        "        <tr>\n" +
                        "          <td colspan=2 align=\"right\"><input type=\"submit\" value=\"Login\"></td>\n" +
                        "        </tr>\n" +
                        "      </table>\n" +
                        "    </form>\n" +
                        "  </body>\n" +
                        "</html>");
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session != null){
            //response.sendRedirect("");
            session.invalidate();
        }
        Map<String,String[]> m = request.getParameterMap();
        if (m.containsKey("name") && m.containsKey("password")){
            String[] name = m.get("name");
            String[] password = m.get("password");
            try{
                User user = User.getUserByName(name[0]);
                if (password[0].equals(user.getPassword())){
                    //session
                    session = request.getSession();
                    session.setAttribute("user", user);
                    response.setStatus(response.SC_OK);
                } else {
                    //response.sendRedirect("login");
                    response.setStatus(400);
                }
            } catch (Exception ex){
                //response.sendRedirect("login");
                response.setStatus(400);
            }
        } else {
            //response.sendRedirect("login");
            response.setStatus(400);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
