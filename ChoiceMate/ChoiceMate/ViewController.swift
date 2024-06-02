//
//  ViewController.swift
//  ChoiceMate
//
//  Created by Ayomide Adekoya on 5/24/24.
//

import UIKit

class ViewController: UIViewController {
    
    private let button: UIButton = {
        let button = UIButton()
        button.backgroundColor = .systemBlue
        button.setTitle("My Button", for: .normal)
        return button
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
//        self.view.backgroundColor = .systemBlue
        
        self.view.addSubview(button)
//        button.frame = CGRect(x: 100, y: 300, width: 120, height: 44)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
            button.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
            button.heightAnchor.constraint(equalToConstant: 44),
            button.widthAnchor.constraint(equalToConstant: 120),
            
//            button.topAnchor.constraint(equalTo: self.view.topAnchor),
//            button.bottomAnchor.constraint(equalTo: self.view.bottomAnchor),
//            button.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
//            button.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
        ])
        
        button.addTarget(self, action: #selector(didTapButton), for: .touchUpInside)
    }
    
    @objc func didTapButton() {
        let vc = SecondViewController()
        
        self.navigationController?.pushViewController(vc, animated: true)
    }

}

