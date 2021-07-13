# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
john = User.create(email: 'john@sample.com', password: '123456')
jane = User.create(email: 'jane@sample.com', password: '123456')

john.events.create!([
  {
    title: "London Retail Expo",
    start_datetime: "Mon, 14 Oct 2023",
    location: "London Excel Centre",
    description: 'Sit excepteur culpa tempor ut aute nisi id ea sit laboris. Aute aliquip ad ex laboris ex aliqua nostrud sint veniam tempor nulla. Quis ea do elit est cillum. Nulla quis adipisicing veniam voluptate sit exercitation est sit pariatur tempor exercitation.',
    image_url: 'https://source.unsplash.com/random'
  },
  {
    title: "Enterprise Sales Training Workshop",
    start_datetime: "Tue, 15 Oct 2023",
    location: "Expert Sales Company Headquarters",
    description: 'Sit excepteur culpa tempor ut aute nisi id ea sit laboris. Aute aliquip ad ex laboris ex aliqua nostrud sint veniam tempor nulla. Quis ea do elit est cillum. Nulla quis adipisicing veniam voluptate sit exercitation est sit pariatur tempor exercitation.',
    image_url: 'https://source.unsplash.com/random'
  }
])

jane.events.create!([
  {
    title: "Ruby Hack Night",
    start_datetime: "Fri, 18 Oct 2023",
    location: "Learnetto Headquarters",
    description: 'Sit excepteur culpa tempor ut aute nisi id ea sit laboris. Aute aliquip ad ex laboris ex aliqua nostrud sint veniam tempor nulla. Quis ea do elit est cillum. Nulla quis adipisicing veniam voluptate sit exercitation est sit pariatur tempor exercitation.',
    image_url: 'https://source.unsplash.com/random'
  },
  {
    title: "Beginners Salsa dance meetup",
    start_datetime: "Sat, 14 Oct 2023",
    location: "Bar Salsa",
    description: 'Sit excepteur culpa tempor ut aute nisi id ea sit laboris. Aute aliquip ad ex laboris ex aliqua nostrud sint veniam tempor nulla. Quis ea do elit est cillum. Nulla quis adipisicing veniam voluptate sit exercitation est sit pariatur tempor exercitation.',
    image_url: 'https://source.unsplash.com/random'
  }
])
