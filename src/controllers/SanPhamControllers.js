// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getsanphamAll = async(req, res) => {
    try {
        const sanpham = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('sanpham/index', {
                        sanpham: results
                    });
                }
            });

        });

        // Trả về danh sách người dùng đã phân trang và các biến phân trang
        // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getsanphamById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM sanpham WHERE SPID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy sản phẩm');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createsanpham = (req, res) => {
    const {LoaiHangID, SPID, Tensp, Dvtinh, Slton} = req.body;

    db.query(
        'INSERT INTO sanpham (LoaiHangID, SPID, Tensp, Dvtinh, Slton) VALUES (?, ?, ?, ?, ?)', [LoaiHangID, SPID, Tensp, Dvtinh, Slton],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.redirect('/admin/sanpham');
            }
        }
    );
};
exports.createsanpham2 = (req, res) => {
    res.render('sanpham/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatesanpham = (req, res) => {
    const { id } = req.params;
    const { LoaiHangID, Tensp, Dvtinh, Slton} = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE sanpham SET LoaiHangID = ?, Tensp = ?, Dvtinh = ?, Slton = ? WHERE SPID = ?', [LoaiHangID, Tensp, Dvtinh, Slton, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy mã sản phẩm để cập nhật');
            } else {
                res.redirect('/admin/sanpham');
            }
        }
    );
};
exports.updatesanpham2 = async(req, res) => {
    try {
        const sanpham = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const { id } = req.params;

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM sanpham WHERE SPID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('sanpham/edit', {
                        sanpham: results[0]
                    });
                }
            });

        });

        // Trả về danh sách người dùng đã phân trang và các biến phân trang
        // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

// Xóa một loại sản phẩm bằng ID
exports.deletesanpham = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM sanpham WHERE SPID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm để xóa');
        } else {
            res.json({ message: 'Loại sản phẩm đã được xóa thành công' });
        }
    });
};