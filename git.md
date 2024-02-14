# Git

1. Make commit atomic. Keep each commit focused on a single thing. Emcompass a single feature, change or fix
2. git push origin **\_** -> this is the name of the branch. if branch is not there, it will be created automatically. ideally same branch name as local, otherwise it's local:remote branch name

Git pull all branches locally in a new repo

1. git init
2. git remote add origin
3. git fetch --all
4. git branch -r
5. git checkout -b local*branch_name origin/remote_branch*

git reset mixed -> go back to previous commit without removing the changes in the working directory

rebase

1. git switch master
2. git pull
3. git switch feature
4. git rebase origin/master
5. git push --force origin feature

reset
1. git reset --mixed -> reset but keep changes


stash push and stash pop -> to stash away changes to change branch, then pop when changed back

rebase interactive, squash -> combine commits into 1




