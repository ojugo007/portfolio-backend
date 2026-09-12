## baseurl:
`https://portfolio-backend-zj29.onrender.com`

| Method | Route                                  | Protected |
| ------ | --------------------------------------- | --------- |
|
 POST   | `/auth/signin`                          | ❌         |
| GET    | `/edu/`                                 | ❌         |
| GET    | `/edu/:educationId`                     | ❌         |
| POST   | `/edu/add`                              | 🔐        |
| PATCH  | `/edu/update/:educationId`              | 🔐        |
| DELETE | `/edu/delete/:educationId`              | 🔐        |
| GET    | `/experience/`                          | ❌         |
| GET    | `/experience/:experienceId`             | ❌         |
| POST   | `/experience/add-new`                   | 🔐        |
| PATCH  | `/experience/update/:experienceId`      | 🔐        |
| DELETE | `/experience/delete/:experienceId`      | 🔐        |
| GET    | `/message/`                             | 🔐        |
| GET    | `/message/:messageId`                   | 🔐        |
| POST   | `/message/send-message`                 | ❌         |
| POST   | `/message/generate-response/:messageId` | 🔐        |
| POST   | `/message/:messageId/send-response`     | 🔐        |
| DELETE | `/message/delete/:messageId`            | 🔐        |
| GET    | `/service/`                             | ❌         |
| GET    | `/service/:serviceId`                   | ❌         |
| POST   | `/service/new/add`                      | 🔐        |
| PATCH  | `/service/update/:serviceId`            | 🔐        |
| DELETE | `/service/delete/:serviceId`            | 🔐        |
| GET    | `/project/`                             | ❌         |
| GET    | `/project/:projectId`                   | ❌         |
| POST   | `/project/new/add`                      | 🔐        |
| PATCH  | `/project/update/:projectId`            | 🔐        |
| DELETE | `/project/delete/:projectId`            | 🔐        |
| GET    | `/stack/`                               | ❌         |
| GET    | `/stack/:stackId`                       | ❌         |
| POST   | `/stack/new/add`                        | 🔐        |
| PATCH  | `/stack/update/:stackId`                | 🔐        |
| DELETE | `/stack/delete/:stackId`                | 🔐        |
| GET    | `/testimonial/`                         | ❌         |
| GET    | `/testimonial/:testimonialId`           | ❌         |
| POST   | `/testimonial/new/add`                  | 🔐        |
| PATCH  | `/testimonial/update/:testimonialId`    | 🔐        |
| DELETE | `/testimonial/delete/:testimonialId`    | 🔐        |
