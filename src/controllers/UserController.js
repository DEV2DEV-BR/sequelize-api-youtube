const { User } = require("../models");

class UserController {
  async store(req, res) {
    try {
      const { name, email } = req.body;

      const userAlreadyExists = await User.findOne({ where: { email } });

      if (userAlreadyExists) {
        return res.status(400).json({ message: "Esse usuário já existe" });
      }

      if (!name || !email) {
        return res
          .status(400)
          .json({ message: "name e email são obrigatórios" });
      }

      const createdUser = await User.create({ name, email });

      return res.status(200).json(createdUser);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao cadastrar usuário" });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar usuários" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: "Falha ao detalhar usuário" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const { name, email } = req.body;

      await User.update(
        { name, email },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({ message: "Usuário atualizado" });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao atualizar o usuário" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      await User.destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).json({ message: "Usuário excluido com sucesso" });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao excluir o usuário" });
    }
  }
}

module.exports = new UserController();
