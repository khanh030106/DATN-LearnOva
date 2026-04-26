-Hiện tại thì project mình t đang tạo 6 branch gồm: main, develop, khanh, thông, minh, hiếu  
-Mỗi người chỉ được đẩy code lên branch của mình *** KHÔNG ĐƯỢC ĐẨY LÊN MAIN ***  
-Trước mỗi buổi review thì sẽ đẩy lên develop. Trong buổi review sẽ test, nếu oke mới đẩy lên main  
*****KHÔNG ĐẨY LÊN main, KHÔNG ĐẨY LÊN main, KHÔNG ĐẨY LÊN main- ĐIỀU GÌ QUAN TRỌNG NHẮC LẠI 3 LẦN  

-Clone project vể (lần đầu và chỉ làm 1 lần): + Tạo 1 folder (ví dụ: DATN)  
                                              + cd tới folder đó  
                                              + clone project về: git clone https://github.com/khanh030106/DATN-LearnOva.git  

Quy trình mỗi ngày như sau:   
                            + Mở Terminal  
                            + cd TỚI FOLDER CHUNG ĐỂ PROJECT  
                            + chuyển sang branch của mình: git checkout tênbranch (ví dụ: git checkout khanh, nhớ thay tên t bằng branch của mình)  
                            + kéo code mới nhất từ branch mình: git pull origin tênbranch (ví dụ: git pull origin khanh, nhớ thay tên t bằng branch của mình)   
                            + git fetch origin 
                            + merge code mới từ team: git merge origin/develop  
                            + Rồi code  
                            + Sau khi code xong thì check các file thay đổi: Mở terminal ở folder project: git status  
                            + Add code: git add .  
                            + Commit phần đã code trong ngày: git commit -m "nội dung commit" (ví dụ: git commit -m "xong service xử lí đăng nhập")  
                            + Push code lên branch của mình, KHÔNG PUSH LÊN main: git push origin tênbranch (ví dụ: git push origin khanh, nhớ thay tên t bằng branch của mình)  


  TRƯỚC BUỔI REVIEW THÌ PUSH LÊN develop: + git checkout develop  
                                          + git pull origin develop
                                          + git merge origin/branch (THAY BRANCH BẰNG TÊN MÌNH)  
                                          + git push origin develop  


  SAU KHI REVIEW VÀ TEST XONG: + git checkout main  
                               + git pull origin main  
                               + git merge develop  
                               + git push origin main
                            
  *******CHỖ NÀO KHÔNG HIỂU THÌ IB HỎI AE LIỀN CHỨ KHÔNG GẮNG LÀM HOẶC LÀM ĐẠI  
  Hiện tại thì trong mỗi folder đều đang có 1 file .gitkeep t tạo để giữ chỗ, khi ae tạo thêm file trong folder này thì có thể xóa file .gitkeep
